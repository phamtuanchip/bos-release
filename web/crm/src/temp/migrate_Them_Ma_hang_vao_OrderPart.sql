DECLARE db_cursor CURSOR FOR 

select aa.ProductShopCode, bb.Id from 

									(select b.Barcode, c.ProductShopCode from (select Id from xDocument_Document where Code='Product') a
									join (select DataValue as Barcode,Parent as PId1 from xDynamicData_String where Code='Barcode') b
									on a.Id = b.PId1
									join (select DataValue as ProductShopCode,Parent as PId2 from xDynamicData_String where Code='CodeName') c
									on a.Id = c.PId2) aa

									join

						(select b.Barcode, a.Id from
											(select Id from xDocument_Document where Code='OrderPart') a
											join (select DataValue as Barcode,Parent as OrderPartId from xDynamicData_String where Code='Barcode') b
											on a.Id = b.OrderPartId) bb
											on aa.Barcode = bb.Barcode;



	DECLARE @ProductShopCode nvarchar(MAX);
	DECLARE @Id uniqueidentifier;
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO  @ProductShopCode, @Id;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		   insert into xDynamicData_String (Id,Parent, DataValue, Code, Description) values (NEWID(), @Id, @ProductShopCode, 'SubCode', @ProductShopCode)

		   FETCH NEXT FROM db_cursor INTO @ProductShopCode, @Id;
	END;
	CLOSE db_cursor;
	DEALLOCATE db_cursor;