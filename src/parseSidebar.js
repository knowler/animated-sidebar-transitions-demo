export default function(tree) {
  let current = 0;
  let routes = [];

  function walk(node, parent = null) {
    routes.push({
      path: node.path,
      title: node.title,
      body: node.body,
      parent,
      children: [],
    });

    current++;

    if (node.children) {
      const newParent = current - 1;

      node.children.forEach(child => {
        routes[newParent].children.push(current);
        walk(child, newParent);
      });
    }
  }

  walk(tree);

  return routes;
}
