--update giá sang kho

	DECLARE db_cursor CURSOR FOR 	select aa.Id, bb.Name, bb.Unit
									from
									(select Id,MetaKeywords  from xDocument_Document where Code='Warehouse') as aa
									join (select b.*,c.*, a.Id, a.Name from
											(select * from xDocument_Document where Code='Product') a
											join (select DataValue as Barcode,Parent as ParentB from xDynamicData_String where Code='Barcode') b
											on a.Id = b.ParentB
											join (select DataValue as Unit,Parent as ParentC from xDynamicData_String where Code='Unit') c
											on a.Id = c.ParentC
											) as bb
									on aa.MetaKeywords=bb.Barcode;
	DECLARE @Id uniqueidentifier;
	DECLARE @Name nvarchar(MAX);
	DECLARE @Unit nvarchar(MAX);
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @Id, @Name, @Unit;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		   update [xDocument_Document] set Name = @Name, FriendlyUrl= @Unit ,Modified = GETDATE() where Id=@Id;

		   FETCH NEXT FROM db_cursor INTO @Id, @Name, @Unit;
	END; 
	CLOSE db_cursor;
	DEALLOCATE db_cursor;

