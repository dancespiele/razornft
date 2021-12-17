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

    function faucetNFT(address user) public {
        this.safeTransferFrom(contractOwner, user, RAZOR, 1, "");
        previusBlock[msg.sender] = 0;

        if(!this.hasRole(USER_ROLE, user)) {
            _setupRole(USER_ROLE, user);
        }
    }

    function calcReward() public view returns(uint256) {
        uint256 balance = this.balanceOf(msg.sender, RAZOR);
        uint256 blockDiff = block.number.sub(previusBlock[msg.sender]);
        if(balance <= 0 || blockDiff <=0) {
            return 0;
        }

        return (balance.div(1000)).add(blockDiff);
    }

    function mintRZR() public {
        uint256 rewards = calcReward();
        _mint(msg.sender, RZR, rewards, "");
        previusBlock[msg.sender] = block.number;

        if(!this.hasRole(GROUP_ROLE, msg.sender)) {
            _setupRole(GROUP_ROLE, msg.sender);
        }
    }
}