
	DECLARE db_cursor CURSOR FOR select a.Id, b.DataValue from
	(Select Id from xDocument_Document where Code='Lead') a
	join
	(Select DataValue,Parent from xDynamicData_String where Code='AccessChannel') b
	on a.Id = b.Parent;
	DECLARE @Id uniqueidentifier;
	DECLARE @Promulgator uniqueidentifier;
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @Id ,@Promulgator;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		   update [xDocument_Document] set Promulgator = @Promulgator where Id=@Id;

		   FETCH NEXT FROM db_cursor INTO @Id ,@Promulgator;
	END;
	CLOSE db_cursor;
	DEALLOCATE db_cursor;


DECLARE db_cursor CURSOR FOR select b.Id,a.Promulgator from
	(select OfficialNumber, Promulgator from xDocument_Document where Code='Lead') a
	join (select Id, OfficialNumber, Promulgator from xDocument_Document where Code='Order') b
	on a.OfficialNumber = b.OfficialNumber

	union all

	select b.Id, a.Promulgator from
	(select OfficialNumber, Promulgator from xDocument_Document where Code='Lead') a
	join (select Id, OfficialNumber, Promulgator from xDocument_Document where Code='OrderPart') b
	on a.OfficialNumber = b.OfficialNumber;
	DECLARE @Idx uniqueidentifier;
	DECLARE @Promulgatorx uniqueidentifier;
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @Idx, @Promulgatorx;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		   update [xDocument_Document] set Promulgator = @Promulgatorx where Id=@Idx

		   FETCH NEXT FROM db_cursor INTO @Idx, @Promulgatorx;
	END;
	CLOSE db_cursor;
	DEALLOCATE db_cursor;




	update xDocument_Document set Promulgator = '10967eb4-dcc9-43d4-837f-a7902d0f2843' where Promulgator = '37e6c930-b16a-40ef-ae5d-21667ccd8e52';
	update xDocument_Document set Promulgator = '167e1951-7a91-435c-b429-b1913f5b590a' where Promulgator = '3aea7add-3814-4138-b127-03fb53e5b545';
	update xDocument_Document set Promulgator = '167e1951-7a91-435c-b429-b1913f5b590a' where Promulgator = '49ceaf9f-cd6c-4089-9bae-42763b903e75';
	update xDocument_Document set Promulgator = '10967eb4-dcc9-43d4-837f-a7902d0f2843' where Promulgator = '174074e3-b6c5-4a78-bb64-59a4ab716723';
	update xDocument_Document set Promulgator = '10967eb4-dcc9-43d4-837f-a7902d0f2843' where Promulgator = '6da21b7e-e735-42aa-be01-8d68aee84572';
	update xDocument_Document set Promulgator = '10967eb4-dcc9-43d4-837f-a7902d0f2843' where Promulgator = '2b37a535-8d92-4b8c-8dc9-ef58ca19aadc';