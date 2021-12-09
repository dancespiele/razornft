// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Razor is ERC1155, Ownable {
    uint256 public constant RAZOR = 0;
    uint256 public constant RZR = 1;
    mapping(address => uint256) internal rewards;
    mapping (uint256 => string) private _uris;

    constructor() ERC1155("https://localhost:3000/item/{id}.json") {
        _mint(msg.sender, RAZOR, 1000, "");
        _mint(msg.sender, RZR, 10**5, "");
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return(_uris[tokenId]);
    }
    
    function setTokenUri(uint256 tokenId, string memory url) public onlyOwner {
        require(bytes(_uris[tokenId]).length == 0, "Cannot set url twice"); 
        _uris[tokenId] = url; 
    }
}