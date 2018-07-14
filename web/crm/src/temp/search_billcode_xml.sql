
declare @Value varchar(10)
declare @Code varchar(10)
set @Value = 'TV.0151'
set @Code = 'BillCode'
 
SELECT d.id, d.[Data], d.Code, s.Name
  FROM [In.BOs_CRM_IKIGAI3].[dbo].[xDocument_Document] d
  
  join [In.BOs_CRM_IKIGAI3].[dbo].[xDynamicData_Setting] s on
  d.MetaDescription = s.Id
where d.[Data].exist('Document/Data/Fields/Field/Code/text()[. = sql:variable("@Code")]') = 1
and d.[Data].exist('Document/Data/Fields/Field/Value/text()[. = sql:variable("@Value")]') = 1
and d.Code = 'Order'
  

  declare @Value varchar(10)
declare @Code varchar(10)
set @Value = 'LE.00537'
set @Code = 'BillCode'
 
SELECT d.id, d.[Data], d.Code, s.Name
  FROM [In.BOs_CRM_IKIGAI3].[dbo].[xDocument_Document] d
  
  join [In.BOs_CRM_IKIGAI3].[dbo].[xDynamicData_Setting] s on
  d.MetaDescription = s.Id
where d.[Data].exist('Document/Data/Fields/Field/Code/text()[. = sql:variable("@Code")]') = 1
--and d.[Data].exist('Document/Data/Fields/Field/Value/text()[. = sql:variable("@Value")]') = 1
and d.Code = 'Order' and s.Name = N'Đã hủy'

declare @Value varchar(10)
declare @Code varchar(10)
set @Value = 'LETR.00439'
set @Code = 'BillCode'
 
SELECT d.id, d.[Data], d.Code, s.Name
  FROM [In.BOs_CRM_IKIGAI3].[dbo].[xDocument_Document] d
  
  join [In.BOs_CRM_IKIGAI3].[dbo].[xDynamicData_Setting] s on
  d.MetaDescription = s.Id
where d.[Data].exist('Document/Data/Fields/Field/Code/text()[. = sql:variable("@Code")]') = 1
--and d.[Data].exist('Document/Data/Fields/Field/Value/text()[. = sql:variable("@Value")]') = 1
and d.Code = 'Order' 
--and s.Name = N'Đã xác nhận'
and s.Name = N'Đã hủy'