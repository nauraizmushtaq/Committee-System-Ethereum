pragma solidity >=0.4.21 <0.7.0;

contract Committee {

    struct Member {
        address _address; //address of member
        string name;
        uint amountPaid; //amount in wei that member has paid
        uint security;
    }

    uint public quorum; //fixed number of members default=3

    uint public amount; //amount in wei that everyone must pay default = 1 eth

    uint public security_amount; //security that must be paid when joining

    uint public current_cycle;
    mapping(address => bool) public paid_in_cycle; //check if member has paid in current cycle
    uint cycle_paid_count;

    uint public lateFee;

    bool public isActive;//is committee running (or waiting for members etc)?

    mapping(uint => Member) public members; //to store member objects to get name ect of members4
    mapping(address => uint) public _members; //to get key of member => 0 for invalid members, some index for valid members
    address payable[] members_array;
    uint public memberCount;
    mapping(address => bool)  blacklist; //addresses who are not allowed to be members => blacklist(address) == true if member is in blacklist

    address public owner; //owner of pool

    address payable public turnAddress; //whose turn it is default: owner

    constructor() public {
        owner = msg.sender;
        isActive = false;
        amount = 1 ether;
        turnAddress = msg.sender;
        quorum = 3;

    }

    function addMember (address member_address, string memory name) public payable returns (bool){
        if(isActive == true){
            return false;
        }
        if(blacklist[member_address] == true){
            return false;
        }
        if(_members[member_address] > 0) {
            return false;
        }

        /**Create new member */
        memberCount++; //increse index number
        members[memberCount] = Member(member_address,name,0,0); //create member object add to members map
        _members[member_address] = memberCount; //store index in _members map
      	members[memberCount].security = msg.value;
        members_array.push(member_address);
        /*Make pool as active if quorum complete*/
        if(memberCount == quorum){
            isActive = true;
            current_cycle = 1;
        }
        return true;
    }

    function setQuorum(uint q) public {
        quorum = q;
    }

    function setAmount(uint a) public {
        amount = a;
    }

    function setLateFee(uint lf) public {
        lateFee = lf;
    }

    function payCommittee(address member_address) public payable{
        require (isActive == true);
        if(paid_in_cycle[member_address] == true){
            return;
        }
        //TODO: check if msg.value is correct
        uint index = _members[member_address]; //get index
        members[index].amountPaid += msg.value; //msg.value contains the amount sent
        //^ Note: this is only record keeping. Actual amount is stored in contract.

        paid_in_cycle[member_address] = true;
        cycle_paid_count+=1;
    }

    function isPoolOwner() public view returns(bool) {
        return msg.sender == owner;
    }

    function withdrawCommitee() public{
        //reset if cycle complete
        if(cycle_paid_count == memberCount){
            turnAddress.transfer(amount);
            for (uint i = 0; i<members_array.length; i++) {
                paid_in_cycle[members_array[i]] = false; //set all members pay in cycle to false
            }
            cycle_paid_count = 0;
            current_cycle+=1;
            turnAddress = members_array[current_cycle-1];
        }
        
    }

    function stopCommittee() public {
        isActive = false;
      	//TODO: loop to pay back security
        for (uint i = 0; i<members_array.length; i++) {
            members_array[i].transfer(members[members_array[i]].security); //set all members pay in cycle to false
        }
    }

}