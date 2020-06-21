import { REACT_ELEMENT_TYPE } from '../shared/ReactSymbols'

const SEPARATOR = '.'; // 分隔符 开头的分隔符
const SUB_SEPARATOR = ':';  // 子分隔符 中间的分隔符

/**
 *
 * @param children 要映射的元素，可能是一个数组，也可能是一个可渲染的节点
 * @param mapFunction
 * @param context
 * result 我们会把我们所有映射出来的节点放在 result 里面
 */
function mapChildren(children, mapFunction, context) {
  const result = []
  mapIntoWithKeyPrefixInternal(children, result, null, mapFunction, context)
  return result
}

// 映射函数的核心有两个数组的处理
// prefix 指的是渲染前的节点 key, 最终 key 的 / 前面的那部分
function mapIntoWithKeyPrefixInternal(children, result, prefix, mapFunction, context) {
  // traverseContext 遍历的上下文
  if (prefix != null) {
    prefix = prefix + '/' // .0:0 => .0:0/
  }
  const traverseContext = { result, prefix, mapFunction, context }
  traverseAllChildren(children, '', mapSingleChildIntoContext, traverseContext)
}

function traverseAllChildren(children, nameSoFar, mapSingleChildIntoContext, traverseContext) {
  let type = typeof children
  // 如果 type 是字符串或数字，或者 type 是一个对象，但是 children.$$typeof 是一个 React 元素，说明 children 是一个可渲染节点
  if (type === 'string' || type === 'number' || (type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE)) {
    mapSingleChildIntoContext(traverseContext, children,
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar
    )
  } else  if (Array.isArray(children)){
    // 如果传过来的 nameSoFar 是空的。前缀就是`.`，否则就是`:`
    // 第二次进来的时候 nameSoFar = .0
    let nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUB_SEPARATOR
    // 如果 children 是数组的话， traverse
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      let nextName = nextNamePrefix + getComponentKey(child, i);
      traverseAllChildren(children[i], nextName, mapSingleChildIntoContext, traverseContext)
    }
  }
}

function getComponentKey(component, index) {
  return component.key || index.toString(36); // 如果说此节点有自己的 key，就用自己的 key，如果没有就用他的索引
}

// 如果执行到这个地方，child肯定是一个节点
function mapSingleChildIntoContext(traverseContext, child, childKey) {
  let { result, prefix, mapFunction, context } = traverseContext
  let mappedChild = mapFunction.call(context, child)
  // 往 result 里面放的永远只能是一个对象。不能是数组
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, c => c, context)
  } else {
    // 把对象展开，重写 key. prefix 转换前索引组成的 key/childKey 转换后的索引组成的 key
    result.push({...mappedChild, key: prefix + childKey})
  }
}

export {
  mapChildren as map
}
