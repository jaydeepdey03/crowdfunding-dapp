// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Crowdfunding{
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256=>Campaign) public CampaignMap;

    uint256 public CampaignCount = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns(uint256) {
        Campaign storage campaign = CampaignMap[CampaignCount];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        CampaignCount++;

        return CampaignCount - 1;
    }

    function donateToCampaign(uint256 _id) public payable{
        uint256 amount = msg.value;
        Campaign storage campaign = CampaignMap[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool isSent, ) = payable(campaign.owner).call{value: msg.value}("");

        if(isSent){
            campaign.amountCollected += amount;
        }
    }

    function getCampaigns() public view returns(Campaign[] memory){
        Campaign [] memory allCampaigns = new Campaign[](CampaignCount);

        for(uint256 i = 0; i<CampaignCount; i++){
            Campaign storage item = CampaignMap[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getDonators(uint256 _id) public view returns(address[] memory, uint256[] memory){
        return(CampaignMap[_id].donators, CampaignMap[_id].donations);
    }
}