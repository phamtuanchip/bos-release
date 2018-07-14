--Update giá cho sản phẩm
	DECLARE db_cursor CURSOR FOR 						select  a.Id,c.Price from
											(select * from xDocument_Document where Code='Product') a
											left join (select DataValue as Barcode,Parent as ParentB from xDynamicData_String where Code='Barcode') b
											on a.Id = b.ParentB
											left join (select DataValue as Price,Parent as ParentC from xDynamicData_Integer where Code='Price') c
											on a.Id = c.ParentC;
	DECLARE @Id uniqueidentifier;
	DECLARE @Price int;
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @Id, @Price;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		   update [xDocument_Document] set TotalPages = @Price where Id=@Id;

		   FETCH NEXT FROM db_cursor INTO @Id, @Price;
	END;
	CLOSE db_cursor;
	DEALLOCATE db_cursor;