/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Parent]
      ,[Index]
      ,[Code]
      ,[Name]
      ,[Data]
      ,[Created]
      ,[CreatedBy]
      ,[Modified]
      ,[ModifiedBy]
      ,[Type]
      ,[Status]
      ,[Description]
      ,[Author]
      ,[AuthorDate]
      ,[AutoId]
      ,[AverageRatingPoints]
      ,[Category]
      ,[Categories]
      ,[DisplayDate]
      ,[DisplayImage]
      ,[DocumentForm]
      ,[DocumentField]
      ,[DocumentType]
      ,[EnforcedDate]
      ,[ExpiredDate]
      ,[ExpiredHotDate]
      ,[FriendlyUrl]
      ,[Lead]
      ,[MetaDescription]
      ,[MetaKeywords]
      ,[MetaTitle]
      ,[OfficialNumber]
      ,[ParentType]
      ,[Priority]
      ,[Promulgator]
      ,[PublishedDate]
      ,[RelatedDocuments]
      ,[Signer]
      ,[Source]
      ,[SourceUrl]
      ,[State]
      ,[Title]
      ,[TotalAttachments]
      ,[TotalComments]
      ,[TotalDownloads]
      ,[TotalPages]
      ,[TotalRatingPoints]
      ,[TotalRatings]
      ,[TotalReadingTimes]
      ,[ValidatedDate]
  FROM [In.BOs_CRM_IKIGAI3].[dbo].[xDocument_Document]
  Where Code = 'OrderPart'  

  select count(*)
   FROM [In.BOs_CRM_IKIGAI3].[dbo].[AG_Data_Linked]
  where Parent in (
  select Id From [In.BOs_CRM_IKIGAI3].[dbo].[xDocument_Document] where Code = 'OrderPart'
  ) and Child = 'A94BAE42-4953-F536-26FB-E5503BE76321'

   select count(*)
   From [In.BOs_CRM_IKIGAI3].[dbo].[xDocument_Document] where Code = 'OrderPart' and Priority = 0

  INSERT INTO  [In.BOs_CRM_IKIGAI3].[dbo].[AG_Data_Linked](Parent, Code, Child, [Name], ParentTable, ChildTable)
(SELECT Id,'View', 'A94BAE42-4953-F536-26FB-E5503BE76321', [Name]+'-Everyone', 'xObject', 'tblGroup'  FROM  [In.BOs_CRM_IKIGAI3].[dbo].[xDocument_Document] where Code = 'OrderPart')

INSERT INTO  [In.BOs_CRM_IKIGAI3].[dbo].[AG_Data_Linked](Parent, Code, Child, [Name], ParentTable, ChildTable)
(SELECT Id,'View', 'A94BAE42-4953-F536-26FB-E5503BE76321', [Name]+'-Everyone', 'xObject', 'tblGroup'  FROM  [In.BOs_CRM_IKIGAI3].[dbo].[xProfile_Profile] where Code = 'Contact')
