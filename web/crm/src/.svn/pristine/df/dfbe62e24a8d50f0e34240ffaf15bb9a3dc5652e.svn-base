DECLARE db_cursor CURSOR FOR 
select 
  Status, 
  PlanFinishDate, 
  PlanStartDate, 
  PlanManHour 
from 
  AG_Task_Task 
where 
  PlanStartDate >= '2018-05-14T00:00:00'--'#PlanStartDate_StartValue' [>]
  and PlanStartDate < '2018-05-20T23:59:59' --'#PlanStartDate_EndValue' [>]
  and Feature = '801896a5-a36d-43f4-a847-986c51fdf462'
  and Status is not null;
DECLARE @Status varchar(MAX);
DECLARE @PlanFinishDate datetime;
DECLARE @PlanStartDate datetime;
DECLARE @PlanManHour decimal;
declare @TEMP table (
  Status varchar(MAX), 
  PlanManHour decimal(18, 2), 
  NumberOfLead int, 
  NumberOfOrder int
);
declare @depts table (
  GroupId uniqueidentifier, 
  GroupParent uniqueidentifier
);
OPEN db_cursor;
FETCH NEXT 
FROM 
  db_cursor INTO @Status, 
  @PlanFinishDate, 
  @PlanStartDate, 
  @PlanManHour WHILE @@FETCH_STATUS = 0 BEGIN 
  
  WITH CTE AS (
        SELECT GroupId, GroupParent
        FROM tblGroup
        WHERE GroupType = 1 and GroupId = @Status
    UNION ALL
        SELECT t.GroupId, t.GroupParent
        FROM tblGroup t
        INNER JOIN CTE c ON t.GroupParent = c.GroupId and t.GroupType = 1
    )
insert into @depts select GroupId, case GroupId when @Status then GroupId else GroupParent end as GroupParent from CTE;


  insert into @TEMP 
select 
   Status, PlanManHour, NumberOfLead, NumberOfOrder
from 
  (
    select 
      @Status as Status, 
      @PlanManHour as PlanManHour
  ) x 
  left join (
    select 
      NumberOfLead, 
      NumberOfOrder 
    from 
      (
        select 
          count(aa.Id) as NumberOfLead, 
          cc.GroupParent as GroupId 
        from 
          xDocument_Document aa 
          join xDynamicData_String bb on aa.Id = bb.Parent and bb.Code = 'GroupId' 
		  join @depts cc on bb.DataValue = cc.GroupId
        where 
          aa.Code = 'Lead' 
          and aa.Created < @PlanFinishDate 
          and aa.Created >= @PlanStartDate 
        group by 
          cc.GroupParent
      ) T1 
      left join (
        select 
          count(aa.Id) as NumberOfOrder, 
          cc.GroupParent as GroupId 
        from 
          xDocument_Document aa 
          join xDynamicData_String bb on aa.Id = bb.Parent and bb.Code = 'GroupId' 
		  join @depts cc on bb.DataValue = cc.GroupId
        where 
          aa.Code = 'Order' 
          and aa.Created >= @PlanStartDate 
          and aa.Created < @PlanFinishDate 
          and OfficialNumber in (
            select 
              OfficialNumber 
            from 
              xDocument_Document aa 
              join xDynamicData_String bb on aa.Id = bb.Parent 
              and bb.Code = 'GroupId' 
            where 
              aa.Code = 'Lead' 
              and aa.Created < @PlanFinishDate 
              and aa.Created >= @PlanStartDate 
          ) 
        group by 
          cc.GroupParent
      ) T2 on T1.GroupId = T2.GroupId
  ) y on 1 = 1 ;
 delete @depts;
FETCH NEXT 
FROM 
  db_cursor INTO @Status, 
  @PlanFinishDate, 
  @PlanStartDate, 
  @PlanManHour;
END;

select * from @TEMP;
/*SELECT 
  Status as X1, 
  SUM(PlanManHour) as V1, 
  cast(
    (
      cast(
        SUM(NumberOfOrder) as float
      )/ cast(
        SUM(NumberOfLead) as float
      )
    )* 100 as int
  ) as V2 
FROM 
  @TEMP t 
group by 
  Status;*/


CLOSE db_cursor;
DEALLOCATE db_cursor;









--------------



















DECLARE db_cursor CURSOR FOR 
select Status, PlanFinishDate, PlanStartDate, PlanManHour from AG_Task_Task where 
								  PlanStartDate >= '2018-05-14T00:00:00'-- '#PlanStartDate_StartValue' [>]
								  and PlanStartDate < '2018-05-20T23:59:59' --'#PlanStartDate_EndValue' [>]
								  and Feature = 'a70aeb6c-7a30-489e-8ede-aa4cf6304b06'
								  and Status is not null;
DECLARE @Status varchar(MAX);
DECLARE @PlanFinishDate datetime;
DECLARE @PlanStartDate datetime;
DECLARE @PlanManHour decimal;
declare @TEMP table (
  Status varchar(MAX), 
  PlanManHour decimal(18, 2),
  Parent varchar(MAX), 
  Total decimal(18, 2)
);
declare @depts table (
  GroupId uniqueidentifier, 
  GroupParent uniqueidentifier
);

declare @deptsTmp table (
  GroupId uniqueidentifier, 
  GroupParent uniqueidentifier
);

OPEN db_cursor;
FETCH NEXT FROM db_cursor INTO @Status, @PlanFinishDate, @PlanStartDate, @PlanManHour WHILE @@FETCH_STATUS = 0 
  BEGIN 
  
  WITH CTE AS (
        SELECT GroupId, GroupParent
        FROM tblGroup
        WHERE GroupType = 1 and GroupId = @Status
    UNION ALL
        SELECT t.GroupId, t.GroupParent
        FROM tblGroup t
        INNER JOIN CTE c ON t.GroupParent = c.GroupId and t.GroupType = 1
    )

insert into @depts select GroupId, GroupParent from CTE;
insert into @deptsTmp select GroupId, GroupParent from @depts;


DECLARE db_cursor_tmp CURSOR FOR select GroupId from @deptsTmp;
DECLARE @GroupIdTmp uniqueidentifier;
OPEN db_cursor_tmp;

FETCH NEXT FROM db_cursor_tmp INTO @GroupIdTmp WHILE @@FETCH_STATUS = 0 
  BEGIN 
	insert into @depts(GroupId, GroupParent) values (@GroupIdTmp, @GroupIdTmp);
  FETCH NEXT 
FROM 
  db_cursor_tmp INTO @GroupIdTmp
END;
CLOSE db_cursor_tmp;
DEALLOCATE db_cursor_tmp;



  insert into @TEMP 
  select 
		Status, PlanManHour, y.GroupId, y.Total
  from 
	  (select @Status as Status, @PlanManHour as PlanManHour) x 
	  left join 
	  (select ee.GroupParent as GroupId, SUM(bb.DataValue) as Total   
        from 
          (select * from xDocument_Document where Code = 'OrderPart' and Created >= @PlanStartDate and Created < @PlanFinishDate and Priority=0)aa 
          join xDynamicData_Double bb on aa.Id = bb.Parent and bb.Code = 'Total'
		  join xDynamicData_String cc on aa.Id = cc.Parent and cc.Code = 'Store'
		  join (select Id, Promulgator from xDocument_Document where Code = 'POS') dd on dd.Id = cc.DataValue
		  join @depts ee on dd.Promulgator = ee.GroupId
        group by 
          ee.GroupParent
		) y on 1=1;
 delete @depts;
 delete @deptsTmp;
 
FETCH NEXT 
FROM 
  db_cursor INTO @Status, 
  @PlanFinishDate, 
  @PlanStartDate, 
  @PlanManHour;
END;
select Status as X1, PlanManHour as V1, SUM(Total) as V2 from @TEMP t group by Status, PlanManHour;
CLOSE db_cursor;
DEALLOCATE db_cursor;





