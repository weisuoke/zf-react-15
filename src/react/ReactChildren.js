import { REACT_ELEMENT_TYPE } from '../shared/ReactSymbols'

/**
 *
 * @param children 要映射的元素，可能是一个数组，也可能是一个可渲染的节点
 * @param mapFunction
 * @param context
 * result 我们会把我们所有映射出来的节点放在 result 里面
 */
function mapChildren(children, mapFunction, context) {
  const result = []
  mapIntoWithKeyPrefixInternal(children, result, mapFunction, context)
  return result
}

// 映射函数的核心有两个数组的处理
function mapIntoWithKeyPrefixInternal(children, result, mapFunction, context) {
  // traverseContext 遍历的上下文
  const traverseContext = { result, mapFunction, context }
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext)
}

function traverseAllChildren(children, mapSingleChildIntoContext, traverseContext) {
  let type = typeof children
  // 如果 type 是字符串或数字，或者 type 是一个对象，但是 children.$$typeof 是一个 React 元素，说明 children 是一个可渲染节点
  if (type === 'string' || type === 'number' || (type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE)) {
    mapSingleChildIntoContext(traverseContext, children)
  }
}

// 如果执行到这个地方，child肯定是一个节点
function mapSingleChildIntoContext(traverseContext, child) {
  let { result, mapFunction, context } = traverseContext
  let mappedChild = mapFunction.call(context, child)
  result.push(mappedChild)
}

export {
  mapChildren as map
}
