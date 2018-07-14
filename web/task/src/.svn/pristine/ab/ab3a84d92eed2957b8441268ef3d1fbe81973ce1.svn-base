DECLARE db_cursor CURSOR FOR select aa.Type as Promulgator, bb.Id as OrderId, op.Id as OrderPartId--, bb.Data, op.Data 
									from
									(select Id, Type from xDocument_Document where Code='POS') as aa
									join (select b.*, a.* from
											(select * from xDocument_Document where Code='Order') a
											join (select DataValue,Parent as ParentStore from xDynamicData_String where Code='Store') b
											on a.Id = b.ParentStore) as bb
									on aa.Id=bb.DataValue
									join (SELECT *
										  FROM [xDocument_Document]
										  where Code = 'OrderPart') op
									on bb.Id = op.Parent; 
	DECLARE @OrderId uniqueidentifier;
	DECLARE @OrderPartId uniqueidentifier;
	DECLARE @Promulgator uniqueidentifier;
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @Promulgator, @OrderId, @OrderPartId;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		   update [xDocument_Document] set Promulgator = @Promulgator where Id=@OrderId or Id=@OrderPartId;

		   FETCH NEXT FROM db_cursor INTO @Promulgator, @OrderId, @OrderPartId;
	END;
	CLOSE db_cursor;
	DEALLOCATE db_cursor;