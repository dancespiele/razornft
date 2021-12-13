// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Razor is ERC1155, AccessControl, Ownable {
    using SafeMath for uint256;
    uint256 public constant RAZOR = 0;
    uint256 public constant RZR = 1;
    uint256 private previusBlock = block.number;
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant GROUP_ROLE = keccak256("GROUP_ROLE");

    mapping (uint256 => string) private _uris;

    constructor() ERC1155("https://bafybeiaazwp4e4fgukdlkfkmxl33fj33poqoofyvwwzaka3esrzdps2yr4.ipfs.dweb.link/0.json") {
        _mint(msg.sender, RAZOR, 1000, "");
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function NFTfaucet(address user) public {
        this.safeTransferFrom(msg.sender, user, RAZOR, 1, "");

        if(!this.hasRole(USER_ROLE, user)) {
            _setupRole(USER_ROLE, user);
        }
    }

    function mintRZR(address nftHolder) public {
        uint256 balance = this.balanceOf(nftHolder, RAZOR);
        uint256 blockDiff = block.number.sub(previusBlock);
        previusBlock = block.number;
        
        if(balance <= 0 || blockDiff < 3) {
            return;
        }

        uint256 rewards = balance.div(1000);
        _mint(nftHolder, RZR, rewards, "");

        if(!this.hasRole(GROUP_ROLE, nftHolder)) {
            _setupRole(GROUP_ROLE, nftHolder);
        }
    }
}