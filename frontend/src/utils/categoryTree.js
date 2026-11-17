export function buildCategoryTree(categories) {
  const nodes = new Map(categories.map((category) => [category.categoryId, { ...category, children: [] }]))
  const roots = []
  for (const node of [...nodes.values()].sort((a, b) => a.sortOrder - b.sortOrder || a.categoryId - b.categoryId)) {
    const parent = nodes.get(node.parentId)
    if (parent && parent !== node) parent.children.push(node)
    else roots.push(node)
  }
  function annotate(items, depth) {
    for (const node of items) {
      node.depth = depth
      annotate(node.children, depth + 1)
      node.height = 1 + Math.max(0, ...node.children.map((child) => child.height))
    }
  }
  annotate(roots, 1)
  return roots
}

export function filterCategoryTree(nodes, keyword) {
  const query = keyword.trim().toLocaleLowerCase('ko-KR')
  if (!query) return nodes
  return nodes.flatMap((node) => {
    if (node.name.toLocaleLowerCase('ko-KR').includes(query)) return [node]
    const children = filterCategoryTree(node.children, query)
    return children.length ? [{ ...node, children }] : []
  })
}

export function findCategoryNode(nodes, id) {
  for (const node of nodes) {
    if (node.categoryId === id) return node
    const found = findCategoryNode(node.children, id)
    if (found) return found
  }
  return null
}

export function categoryParentOptions(nodes, excludedId) {
  const height = findCategoryNode(nodes, excludedId)?.height ?? 1
  function options(items, path = []) {
    return items.flatMap((node) => {
      if (node.categoryId === excludedId || node.depth + height > 2) return []
      const names = [...path, node.name]
      return [{ categoryId: node.categoryId, label: names.join(' › ') }, ...options(node.children, names)]
    })
  }
  return options(nodes)
}
