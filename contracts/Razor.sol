// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Razor is ERC1155, AccessControl {
    using SafeMath for uint256;
    address public contractOwner = msg.sender;
    uint256 public constant RAZOR = 0;
    uint256 public constant RZR = 1;
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant GROUP_ROLE = keccak256("GROUP_ROLE");
    mapping (address => uint256) private previusBlock;

    mapping (uint256 => string) private _uris;

    constructor() ERC1155("https://bafybeiaazwp4e4fgukdlkfkmxl33fj33poqoofyvwwzaka3esrzdps2yr4.ipfs.dweb.link/0.json") {
        _mint(msg.sender, RAZOR, 1000, "");
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function calcReward(address account) public view returns(uint256) {
        uint256 balance = this.balanceOf(account, RAZOR).mul(10 ** 18);

        if(balance < 1) {
            return 0;
        }

        uint256 blockDiff = block.number.sub(previusBlock[account]);

        return (balance.div(1000)).mul(blockDiff);
    }

    function faucetNFT() public {
        if(this.balanceOf(contractOwner, RAZOR) == 0) {
            return;
        }
        uint256 balanceSender = this.balanceOf(msg.sender, RAZOR);

        _safeTransferFrom(contractOwner, msg.sender, RAZOR, 1, "");
        if(balanceSender == 0) {
            previusBlock[msg.sender] = block.number;
        }

        if(!this.hasRole(USER_ROLE, msg.sender)) {
            _grantRole(USER_ROLE, msg.sender);
        }
    }

    function mintRZR() public {
        uint256 rewards = calcReward(msg.sender);

        if(rewards == 0) {
            return;
        }

        _mint(msg.sender, RZR, rewards, "");
        previusBlock[msg.sender] = block.number;

        if(!this.hasRole(GROUP_ROLE, msg.sender)) {
            _grantRole(GROUP_ROLE, msg.sender);
        }
    }
}