update 
[In.BOs_AP_UAT].[dbo].[tblGroup]
set GroupType = 5 
  where GroupType = 2
  and GroupParent in (
  select GroupId 
  FROM [In.BOs_AP_UAT].[dbo].[tblGroup]
  where GroupType = 4)