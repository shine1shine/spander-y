export const traverseTree = (node, callback) => {
    // if callback returns 'false' then
    // the function continues looping
    // otherwise 'true' will stop the loop
    // the node is passed to the custom callback
    if (callback(node)) {
        return;
    }
    // loop through all the child nodes
    node.childNodes.forEach((childNode) => {
        traverseTree(childNode, callback);
    });
};

export const hasOldNodes = (node) => {
    return !node.isNewNode || !!node.childNodes.find(childNode => hasOldNodes(childNode))
}
export const omitNewNodes = (node) => {
    return {
        ...node,
        childNodes: node.childNodes.filter(childNode => hasOldNodes(childNode)).map(childNode => omitNewNodes(childNode))
    }
}