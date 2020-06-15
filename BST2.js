class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if(this.key === null) {
            this.key = key;
            this.value = value;
        }
        else if (key < this.key) {
            if(!this.left) {
                this.left = new BinarySearchTree(key, value, this);
            } else {
                this.left.insert(key, value)
            }
        }
        else if (key > this.key) {
            if(!this.right) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        if(key === this.key) {
            return this.value;
        }
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if(key === this.key) {
            if(this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        } 
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if(this.parent) {
            if(this === this.parent.left) {
                this.parent.left = node;
            } 
            else if (this === this.parent.right) {
                this.parent.right = node;
            }
            if(node) {
                node.parent = this.parent;
            }
            
        }
        else {
            if(node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
           
        }
    
    }

    _findMin() {
        if(!this.left) {
            return this;
        }
        else {
            return this.left._findMin();
        }
    }

}

function findDepth(tree) {
    var currentNode = this;
    var counterRight = 1;
    var counterLeft = 1;
    if(!currentNode.left && !currentNode.right) {
        if (counterRight > counterLeft) {
            return counterRight;
        } else {
            return counterLeft;
        }
    }
    else if (currentNode.left) {
        counterLeft++;
        findDepth(currentNode.left);
    }

    if(currentNode.right) {
        counterRight++;
        findDepth(currentNode.right);
    }
}

var lastLogged;

function isBST(root) {
    if(root === null) {
        return true;
    }
    if(!isBST(root.left)) {
        return false;
    }
    if(lastLogged !== null && root.key <= lastLogged ) {
        return false;
    }
    console.log('Current Node: ', root.key);
    if(!isBST(root.right)) {
        return false;
    }
    return true;
}