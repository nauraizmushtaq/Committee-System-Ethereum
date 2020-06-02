pragma solidity >=0.4.21 <0.7.0;

contract Committee {

    struct Pool {
        
        address owner;

        mapping(address => bool)  members; //members who have joined
        address[]  _members;
        
        uint quorum; //fixed number of members
        
        uint amount; //in wei
        
        uint timePeriod;//in days

        mapping(address => bool)  blacklist; //addresses who are not allowed to be members
        address[]  _blacklist;
        
        uint lateFee;

        bool isActive;//is committee running (or waiting for members etc)?
    }

    mapping(uint => Pool) public pools;
    uint public poolCount;

    address public owner;


    constructor() public {
        owner = msg.sender;
    }

    //makes new committee pool
    //returns poolid
    function makePool(uint quorum, uint amount, uint timePeriod, uint lateFee) public returns (uint) {
        poolCount++;
        pools[poolCount] = Pool({owner:msg.sender,
            _members:new address[](10),
            quorum:quorum,
            amount:amount,
            timePeriod:timePeriod,
            lateFee:lateFee,
            _blacklist:new address[](10),
            isActive:false});
        return poolCount;
    }

    function addMember (uint poolid, address member_address) public {
        pools[poolid].members[member_address]=true; //mark as true
        pools[poolid]._members.push(member_address); //add to array
        //TODO: who can add member?
        //TODO: if quorum is complete make pool.isActive=true
    }

    function payCommittee(uint poolID) public{
        //TODO: how to pay?
    }

    function isPoolOwner(uint poolID) public view returns(bool) {
        return msg.sender == pools[poolID].owner;
    }

    function stopCommittee(uint index) public {
        require(msg.sender == pools[index].owner);
        pools[index].isActive = false;
    }

}