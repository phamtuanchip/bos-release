
	DECLARE db_cursor CURSOR FOR select aa.Id, bb.Style, bb.ArmStyle, bb.NeckStyle, bb.Metarial
	from
	(select Id,Data, MetaKeywords  from xDocument_Document where Code='Warehouse') as aa
	join (select b.*,c.*,d.*,e.*,f.*, a.Id from
			(select * from xDocument_Document where Code='Product') a
			left join (select DataValue as Barcode,Parent as ParentB from xDynamicData_String where Code='Barcode') b
			on a.Id = b.ParentB
			left join (select DataValue as Style,Parent as ParentC from xDynamicData_String where Code='Style') c
			on a.Id = c.ParentC
			left join (select DataValue as ArmStyle,Parent as ParentD from xDynamicData_String where Code='ArmStyle') d
			on a.Id = d.ParentD
			left join (select DataValue as NeckStyle,Parent as ParentE from xDynamicData_String where Code='NeckStyle') e
			on a.Id = e.ParentE
			left join (select DataValue as Metarial,Parent as ParentF from xDynamicData_String where Code='Metarial') f
			on a.Id = f.ParentF
			) as bb
	on aa.MetaKeywords=bb.Barcode; 
	DECLARE @Id uniqueidentifier;
	DECLARE @Style nvarchar(MAX);
	DECLARE @ArmStyle nvarchar(MAX);
	DECLARE @NeckStyle nvarchar(MAX);
	DECLARE @Metarial nvarchar(MAX);
	OPEN db_cursor;
	FETCH NEXT FROM db_cursor INTO @Id, @Style, @ArmStyle, @NeckStyle, @Metarial;
	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		   update [xDocument_Document] set Signer = @Style, Title= @ArmStyle, Source= @NeckStyle, MetaTitle=  @Metarial where Id=@Id;

		   FETCH NEXT FROM db_cursor INTO @Id, @Style, @ArmStyle, @NeckStyle, @Metarial;
	END;
	CLOSE db_cursor;
	DEALLOCATE db_cursor;