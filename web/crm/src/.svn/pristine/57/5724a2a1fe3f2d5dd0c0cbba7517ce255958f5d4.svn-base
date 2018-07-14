DECLARE db_cursor CURSOR FOR 

select a.Id, c.Promulgator from (select Id from xDocument_Document where Code='Order') a
									join (select DataValue as StoreId,Parent as PId1 from xDynamicData_String where Code='Store') b
									on a.Id = b.PId1
									join (select Id, Promulgator from xDocument_Document where Code='POS') c
									on b.StoreId = c.Id;


	DECLARE @Promulgator uniqueidentifier;
	DECLARE @Id uniqueidentifier;
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO  @Id, @Promulgator;
	WHILE @@FETCH_STATUS = 0  
	BEGIN
		   UPDATE xDocument_Document set DisplayImage= @Promulgator where Id=@Id
		   FETCH NEXT FROM db_cursor INTO  @Id, @Promulgator;
	END;
	CLOSE db_cursor;



	DEALLOCATE db_cursor;

	DECLARE db_cursorx CURSOR FOR 

select ax.Idx, cx.Promulgatorx from (select Id as Idx from xDocument_Document where Code='OrderProduct') ax
									join (select DataValue as StoreId,Parent as PIdx1 from xDynamicData_String where Code='Store') bx
									on ax.Idx = bx.PIdx1
									join (select Id as Idx, Promulgator as Promulgatorx from xDocument_Document where Code='POS') cx
									on bx.StoreId = cx.Idx;


	DECLARE @Promulgatorx uniqueidentifier;
	DECLARE @Idx uniqueidentifier;
	OPEN db_cursorx;
	FETCH NEXT FROM db_cursor INTO  @Idx, @Promulgatorx;
	WHILE @@FETCH_STATUS = 0  
	BEGIN
		   UPDATE xDocument_Document set DisplayImage= @Promulgatorx where Id=@Idx
		   FETCH NEXT FROM db_cursorx INTO  @Idx, @Promulgatorx;
	END;
	CLOSE db_cursorx;
	DEALLOCATE db_cursorx;