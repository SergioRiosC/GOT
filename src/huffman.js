function main()
{
    var newline = "       ";
    var messageToEncode = "mensaje que voy a comprimir"
    console.log("messageToEncode is: " + messageToEncode + newline);
    var huffmanEncoding = new HuffmanEncoding();
    huffmanEncoding.encodeMessageIntoBits(messageToEncode);
    console.log("messageEncoded is: " + huffmanEncoding.bitsEncoded.join("") + newline);
    var messageDecoded = huffmanEncoding.decodeMessageFromBits(huffmanEncoding.bitsEncoded);
    console.log("messageDecoded is: " + messageDecoded + newline);
}
 
// classes
 
function HuffmanEncoding()
{}
{
    HuffmanEncoding.prototype.decodeMessageFromBits = function(bitsToDecode)
    {
        var messageDecoded = "";
 
        var treeNodeCurrent = this.treeRoot;
 
        for (var b = 0; b < bitsToDecode.length; b++)
        {
            var bitCurrent = bitsToDecode[b];
            treeNodeCurrent = treeNodeCurrent.children[bitCurrent];
 
            if (treeNodeCurrent.children.length == 0)
            {
                messageDecoded += treeNodeCurrent.symbol;
                treeNodeCurrent = this.treeRoot;
            }
        }
 
        return messageDecoded;
    }
 
    HuffmanEncoding.prototype.encodeMessageIntoBits = function(messageToEncode)
    {
        var numberOfUniqueSymbols = 0;
        var symbolToFrequencyLookup = [];
 
        for (var i = 0; i < messageToEncode.length; i++)
        {
            var symbol = messageToEncode[i];
            var frequencyOfSymbol = symbolToFrequencyLookup[symbol];
            if (frequencyOfSymbol == null)
            {
                numberOfUniqueSymbols++;
                frequencyOfSymbol = 0;
            }
            frequencyOfSymbol++;
            symbolToFrequencyLookup[symbol] = frequencyOfSymbol;
        }
 
        var treeNodesForSymbols = [];
        var symbolToTreeNodeLookup = [];
 
        for (var symbol in symbolToFrequencyLookup)
        {
            var frequencyOfSymbol = symbolToFrequencyLookup[symbol];
            var treeNodeForSymbol = new HuffmanTreeNode
            (
                symbol,
                frequencyOfSymbol,
                [] // children
            );
 
            symbolToTreeNodeLookup[symbol] = treeNodeForSymbol;
 
            var i;
            for (i = 0; i < treeNodesForSymbols.length; i++)
            {
                var treeNodeExisting = treeNodesForSymbols[i];
                if (frequencyOfSymbol <= treeNodeExisting.frequency)
                {                   
                    break;
                }
            }
 
            treeNodesForSymbols.splice(i, 0, treeNodeForSymbol);
        }
 
        var treeNodeParent;
 
        while (treeNodesForSymbols.length > 1)
        {
            var treeNodesWithFrequenciesLeast = 
            [
                treeNodesForSymbols[0],
                treeNodesForSymbols[1]
            ];
 
            treeNodesForSymbols.splice(0, 1);
            treeNodesForSymbols.splice(0, 1);
 
            var symbolsCombined = 
                treeNodesWithFrequenciesLeast[0].symbol
                + treeNodesWithFrequenciesLeast[1].symbol;
 
            var sumOfFrequencies = 
                treeNodesWithFrequenciesLeast[0].frequency
                + treeNodesWithFrequenciesLeast[1].frequency;
 
            treeNodeParent = new HuffmanTreeNode
            (
                symbolsCombined, // symbol
                sumOfFrequencies, // frequency
                treeNodesWithFrequenciesLeast // children
            )
 
            var i;
            for (i = 0; i < treeNodesForSymbols.length; i++)
            {
                var treeNodeExisting = treeNodesForSymbols[i];
                if (sumOfFrequencies <= treeNodeExisting.frequency)
                {
                    break;
                }
            }   
            treeNodesForSymbols.splice(i, 0, treeNodeParent);   
        }
 
        this.treeRoot = treeNodeParent;
 
        var bitsEncoded = [];
        var bitsForSymbol = [];
 
        for (var i = 0; i < messageToEncode.length; i++)
        {
            var symbol = messageToEncode[i];
            var treeNodeCurrent = symbolToTreeNodeLookup[symbol];
 
            bitsForSymbol.length = 0;           
            while (treeNodeCurrent.parent != null)
            {
                var parent = treeNodeCurrent.parent;
                var indexWithinParent = parent.children.indexOf
                (
                    treeNodeCurrent
                );
                bitsForSymbol.splice(0, 0, indexWithinParent);
                treeNodeCurrent = treeNodeCurrent.parent;
            }   
 
            for (var b = 0; b < bitsForSymbol.length; b++)
            {
                var bitCurrent = bitsForSymbol[b];
                bitsEncoded.push(bitCurrent);
            }
        }
 
        this.bitsEncoded = bitsEncoded;
 
        return this.bitsEncoded;
    }
 
    HuffmanEncoding.prototype.toString = function()
    {
        var treeAsString = this.treeRoot.toString("");
 
        var bitsAsString = "";
        for (var b = 0; b < this.bitsEncoded.length; b++)
        {
            var bitCurrent = this.bitsEncoded[b];
            bitsAsString += bitCurrent;
        }
 
        var returnValue = treeAsString;
        returnValue += bitsAsString;
 
        return returnValue;
    }
}
 
function HuffmanTreeNode(symbol, frequency, children)
{
    this.symbol = symbol;
    this.frequency = frequency;
    this.children = children;
 
    for (var i = 0; i < this.children.length; i++)
    {
        var child = this.children[i];
        child.parent = this;
    }
}
{
    HuffmanTreeNode.prototype.code = function()
    {
        var codeSoFar = "";
 
        var nodeCurrent = this;
 
        while (nodeCurrent != null)
        {
            var nodeParent = nodeCurrent.parent;
 
            if (nodeParent != null)
            {
                var bit = nodeParent.children.indexOf(nodeCurrent);
             
                codeSoFar = "" + bit + codeSoFar;
            }
 
            nodeCurrent = nodeParent;
        }
 
        return codeSoFar;
    }
  
    HuffmanTreeNode.prototype.toString = function(indentSoFar)
    {
        var returnValue = 
            indentSoFar
            + "{"
            + "symbol='" + this.symbol + "' "
            + "frequency='" + this.frequency + "' ";
 
        if (this.children.length == 0)
        {           
            returnValue = 
                returnValue + "code='" + this.code() + "' ";
        }
 
        returnValue = returnValue + "}" ;
 
        for (var i = 0; i < this.children.length; i++)
        {
            var child = this.children[i];
            returnValue += child.toString(indentSoFar);
        }
 
        return returnValue;
    }
}
 
// run
 
main();
 
