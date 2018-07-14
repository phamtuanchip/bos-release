DECLARE db_cursor CURSOR FOR select b.bId,a.Created from 
(select Id, Created from xDocument_Document where Code = 'Order') a
join
(select Id as bId, Parent, Created as bCreated from xDocument_Document where Code = 'Orderpart') b
on a.Id = b.Parent
where CONVERT(Date, Created,101) <> CONVERT(Date, bCreated,101);

	DECLARE @OrderPartId uniqueidentifier;
	DECLARE @Created datetime;
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @OrderPartId, @Created
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		   update [xDocument_Document] set Created = @Created where Id=@OrderPartId

		   FETCH NEXT FROM db_cursor INTO @OrderPartId, @Created
	END;
	CLOSE db_cursor;
	DEALLOCATE db_cursor;