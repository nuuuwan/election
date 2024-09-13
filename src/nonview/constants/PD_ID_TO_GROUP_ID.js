import GROUP_ID_TO_PD_ID_LIST from './GROUP_ID_TO_PD_ID_LIST';

const idx = Object.entries(GROUP_ID_TO_PD_ID_LIST).reduce(function(idx, [groupID, pdIDList])  {
        return pdIDList.reduce(
            function(idx, pdID)  {
                idx[pdID] = groupID;
                return idx;
            },
            idx
        )
    }
, {});
export default idx;