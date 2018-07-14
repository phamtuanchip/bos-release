/****** Script for SelectTopNRows command from SSMS  ******/
SELECT distinct Code
      
	 
  FROM [In.SH.ERP].[dbo].[xDocument_Document]
  where Code not in ('Document','Activities','OrderPart','Warehouse', 'Order','Product', 'Warehouses', 'Lead','Support', 'TaskPriority', 'ImportExportWarehouse')
  


  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT distinct Code     
 FROM [In.SH.ERP].[dbo].[xProfile_Profile]

  	 
  FROM [In.SH.ERP].[dbo].[xProfile_Profile]
  where Code ='Customer'
   
select * from AG_Data_Linked l 
where l.Parent in 
 (  SELECT Id
      
	 
  FROM [In.SH.ERP].[dbo].[xDocument_Document] xd
  where  xd.Code not in ('Document','Activities','OrderPart','Warehouse', 'Order','Product', 'Warehouses', 'Lead','Support', 'TaskPriority', 'ImportExportWarehouse')
  ) 
   

   
select * from AG_Data_Linked l 
where l.Child in 
 (  SELECT UserId
      
	 
  FROM [In.SH.ERP].[dbo].[tblUser] xd
   
  ) 
   
      
select * from AG_Data_Linked l 
where l.Parent in 
 (  SELECT Id
      
	 
  FROM [In.SH.ERP].[dbo].[AG_Task_Task] xd
   
  ) 

  select * from AG_Data_Linked l 
where l.Parent in 
 (  SELECT Id
      
	 
  FROM [In.SH.ERP].[dbo].[xProfile_Profile] xd
   
  ) 

-- codition to except all the setting
select * from AG_Data_Linked l 
where l.Parent not in 
 (  SELECT Id
      
	 
  FROM [In.SH.ERP].[dbo].[xDynamicData_Setting] xd
   
  ) 

     select * from AG_Data_Linked l 
where l.Child in 
 (  SELECT GroupId
      
	 
  FROM [In.SH.ERP].[dbo].[tblGroup] xd
   
  ) 

   select count(*) from AG_Data_Linked l 


   /****** Script for SelectTopNRows command from SSMS  ******/
SELECT count(*)
  FROM [In.SH.ERP].[dbo].[xDynamicData_Integer]  
  where Parent in (
  select Id from xDocument_Document
  )
  SELECT count(*)
  FROM [In.SH.ERP].[dbo].[xDynamicData_String]  
  where Parent in (
  select Id from xDocument_Document
  )
  SELECT count(*)
    from xDocument_Document
   


   SELECT count(*)
  FROM [In.SH.ERP].[dbo].[xDynamicData_Double]  
  where Parent in (
  select Id from xDocument_Document
  )

   SELECT count(*)
  FROM [In.SH.ERP].[dbo].[xDynamicData_DateTime]  
  where Parent in (
  select Id from xDocument_Document
  )
  SELECT *
  FROM [In.SH.ERP].[dbo].[xDynamicData_String]  
  where Parent in (
  select Id from xProfile_Profile
  )

  SELECT *
  FROM [In.SH.ERP].[dbo].[xDynamicData_Integer]  
  where Parent in (
  select Id from xProfile_Profile
  )

   SELECT *
  FROM [In.SH.ERP].[dbo].[xDynamicData_Integer]  
  where Parent in (
  select Id from tblUser
  )

     SELECT *
  FROM [In.SH.ERP].[dbo].[xDynamicData_Integer]  
  where Parent in (
  select Id from tblGroup
  )