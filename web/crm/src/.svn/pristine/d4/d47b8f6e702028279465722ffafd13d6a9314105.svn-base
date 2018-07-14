DECLARE db_cursor CURSOR FOR 
	select bId, a.Source from 
	(select * from
	(select aId, DataValue as Source, a.Parent from (select Id as aId, Parent, Created, Data from xDocument_Document where Code = 'Order') a left join (select Parent, DataValue from xDynamicData_String where Code = 'Source') b on b.Parent = a.aId) t) a
	join
	(select * from
	(select bId, DataValue as Source, a.Parent from (select Id as bId, Parent, Created, Data from xDocument_Document where Code = 'OrderPart') a left join (select Parent, DataValue from xDynamicData_String where Code = 'Source') b on b.Parent = a.bId) t
	where Source is null) b

	on a.aId = b.Parent;

DECLARE @OrderPartId uniqueidentifier;
DECLARE @Source uniqueidentifier;
OPEN db_cursor;
FETCH NEXT FROM db_cursor INTO @OrderPartId, @Source
WHILE @@FETCH_STATUS = 0  
BEGIN  

		insert into xDynamicData_String (Id, Parent, Code, Description, DataValue) values (NEWID() ,@OrderPartId, 'Source', @Source, @Source)

		FETCH NEXT FROM db_cursor INTO @OrderPartId, @Source
END;
CLOSE db_cursor;
DEALLOCATE db_cursor;