--update giá sang kho

	DECLARE db_cursor CURSOR FOR 	select aa.Id, bb.Price
									from
									(select Id,Data, MetaKeywords, TotalPages  from xDocument_Document where Code='Warehouse') as aa
									join (select b.*,c.*, a.Id from
											(select * from xDocument_Document where Code='Product') a
											join (select DataValue as Barcode,Parent as ParentB from xDynamicData_String where Code='Barcode') b
											on a.Id = b.ParentB
											join (select DataValue as Price,Parent as ParentC from xDynamicData_Integer where Code='Price') c
											on a.Id = c.ParentC
											) as bb
									on aa.MetaKeywords=bb.Barcode;
	DECLARE @Id uniqueidentifier;
	DECLARE @Price int;
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @Id, @Price;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		   update [xDocument_Document] set TotalPages = @Price, Modified = GETDATE() where Id=@Id;

		   FETCH NEXT FROM db_cursor INTO @Id, @Price;
	END; 
	CLOSE db_cursor;
	DEALLOCATE db_cursor;

	select * from [xDocument_Document] where Code='Warehouse' and CONVERT(DATE, Modified, 101) = CONVERT(DATE, CAST(GETDATE() AS DATE), 101)   ;
