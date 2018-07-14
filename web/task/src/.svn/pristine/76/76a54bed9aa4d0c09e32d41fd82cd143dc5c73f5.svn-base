SET QUOTED_IDENTIFIER ON
DECLARE @yesterday datetime = dateadd(day,datediff(day,1,GETDATE()),0);
DECLARE @today datetime = dateadd(day,datediff(day,0,GETDATE()),0);
delete xDocument_Document where Code='TaskSummary' and DisplayDate = @yesterday;
DECLARE db_cursor CURSOR FOR 
				select GroupId, GroupName from tblGroup where GroupType = 1;

		DECLARE @GroupId uniqueidentifier;
		DECLARE @GroupName nvarchar(max);

OPEN db_cursor;
FETCH NEXT FROM db_cursor INTO @GroupId,@GroupName
WHILE @@FETCH_STATUS = 0  
BEGIN
		declare @TMP table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @TMP1 table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @TMP2 table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @TMP3 table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @TMP4 table (id uniqueidentifier, taskId uniqueidentifier, worker uniqueidentifier);
		declare @TMP5 table (id uniqueidentifier, taskId uniqueidentifier);
		declare @TMP6 table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @TMP7 table (id uniqueidentifier, taskId uniqueidentifier, worker uniqueidentifier);

		DECLARE @noOfCreatedTasks int;
		DECLARE @noOfFinishedTasks int;
		DECLARE @noOfChangedStatusTimes int;
		DECLARE @noOfOverDateTasks int;
		DECLARE @noOfComments int;
		DECLARE @noOfUpdatedTimes int;
		DECLARE @noOfSeen int;
		DECLARE @noOfReplies int;

		--For @noOfCreatedTasks
		insert into @TMP select t.Id, t.Project, t.Worker  from AG_Task_Task t where CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.Project = @GroupId;

		--For @noOfFinishedTasks
		insert into @TMP1 select Id, Project, Worker  from AG_Task_Task where CONVERT(nvarchar(10), Modified, 120) = CONVERT(nvarchar(10), @yesterday, 120) and (Status='532e9f1e-f5dc-4e75-b7c9-2bd785bbda67' or Status='53cc3819-c019-4749-b0e4-52213438049b') and Project = @GroupId

		--For @noOfChangedStatusTimes
		insert into @TMP2 select Id, Project, CreatedBy from (select l.Id, t.Project, l.CreatedBy, l.Data from AG_Data_Logs l left join AG_Task_Task t on l.SourceId = t.Id 
																	where CONVERT(nvarchar(10), l.Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.Project = @GroupId and l.Code='ChangedHistory') a
						where Data.value('(/Document/Data/Dynamic/Changes)[1]', 'varchar(max)') like '%"ColumnName":"Status"%';
		
		--For @noOfOverDateTasks
		insert into @TMP3 select Id, Project, Worker  from  AG_Task_Task where (( CONVERT(nvarchar(10), Deadline, 120) = CONVERT(nvarchar(10), @today, 120) and
					Status<>'532e9f1e-f5dc-4e75-b7c9-2bd785bbda67' and Status<>'53cc3819-c019-4749-b0e4-52213438049b') or (PlanManHour < ActualManHour  and
					Status='532e9f1e-f5dc-4e75-b7c9-2bd785bbda67' and Status='53cc3819-c019-4749-b0e4-52213438049b')) and CONVERT(nvarchar(10), Modified, 120) = CONVERT(nvarchar(10), @yesterday, 120) and Project = @GroupId;
					
		--For @noOfComments
		--insert into @TMP4 select Id, Parent, ParentId from xDocument_Comment where  CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) 
		--			and Parent in (select t.Id from AG_Task_Task t where CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.Project = @GroupId);
					
		insert into @TMP4 select Id, Project, CreatedBy from (select l.Id, t.Project, l.CreatedBy, l.Data from AG_Data_Logs l left join AG_Task_Task t on l.SourceId = t.Id 
																	where CONVERT(nvarchar(10), l.Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.Project = @GroupId and l.Code='ChangedHistory') a
						where Data.value('(/Document/Data/Dynamic/Changes)[1]', 'varchar(max)') like '%"ColumnName":"Comment"%' and Data.value('(/Document/Data/Dynamic/Version)[1]', 'varchar(max)') not like '%1%';
					
					
		--For @noOfUpdatedTimes
		insert into @TMP5 select Id, SourceId from AG_Data_Logs where  CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and Code='ChangedHistory' 
					and SourceId in (select t.Id from AG_Task_Task t where CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.Project = @GroupId);
					
		--For @noOfSeen
		insert into @TMP6 select Id, Project, CreatedBy from (select l.Id, t.Project, l.CreatedBy, l.Data from AG_Data_Logs l left join AG_Task_Task t on l.SourceId = t.Id 
																	where CONVERT(nvarchar(10), l.Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.Project = @GroupId and l.Code='ChangedHistory') a
						where Data.value('(/Document/Data/Dynamic/Changes)[1]', 'varchar(max)') like '%"ColumnName":"Seen"%';
						
		--For @noOfReplies
		--insert into @TMP7 select x.Id, y.taskId, x.ParentId from (select Id, Parent, ParentId from xDocument_Comment where  CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) ) x
		--				join (select Id, Parent as taskId from xDocument_Comment where  Parent in (select t.Id from AG_Task_Task t where t.Project = @GroupId)) y on x.Parent = y.Id
		insert into @TMP7 select Id, Project, CreatedBy from (select l.Id, t.Project, l.CreatedBy, l.Data from AG_Data_Logs l left join AG_Task_Task t on l.SourceId = t.Id 
																	where CONVERT(nvarchar(10), l.Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.Project = @GroupId and l.Code='ChangedHistory') a
						where Data.value('(/Document/Data/Dynamic/Changes)[1]', 'varchar(max)') like '%"ColumnName":"Reply"%';
		

		select @noOfCreatedTasks = count(*)  from @TMP;
		select @noOfFinishedTasks = count(*)  from @TMP1;
		select @noOfChangedStatusTimes = count(*)  from @TMP2;
		select @noOfOverDateTasks = count(*)  from @TMP3;
		select @noOfComments = count(*)  from @TMP4;
		select @noOfUpdatedTimes = count(*)  from @TMP5;
		select @noOfSeen = count(*)  from @TMP6;
		select @noOfReplies = count(*)  from @TMP7;

		insert xDocument_Document (TotalAttachments, TotalComments, TotalDownloads, TotalPages, TotalRatingPoints, TotalRatings, TotalReadingTimes, Priority, Category, Lead, DisplayDate, Code, State)
		select 
		@noOfCreatedTasks, @noOfFinishedTasks, @noOfChangedStatusTimes,@noOfOverDateTasks,@noOfComments,@noOfUpdatedTimes, @noOfReplies, @noOfSeen, @GroupId, @GroupName, @yesterday, 'TaskSummary', 0
		
		DELETE FROM @TMP;
		DELETE FROM @TMP1;
		DELETE FROM @TMP2;
		DELETE FROM @TMP3;
		DELETE FROM @TMP4;
		DELETE FROM @TMP5;
		DELETE FROM @TMP6;
		DELETE FROM @TMP7;

FETCH NEXT 
FROM 
  db_cursor INTO  @GroupId,@GroupName

  end;
  CLOSE db_cursor;
DEALLOCATE db_cursor;

DECLARE udb_cursor CURSOR FOR 
				select u.UserId, Username, g.GroupId, g.GroupName from tblUser u join tblUserGroup ug on u.UserId = ug.UserId join tblGroup g on ug.GroupId = g.GroupId where u.Status=1 and g.GroupType =1;

		DECLARE @UserId uniqueidentifier;
		DECLARE @Username nvarchar(max);
		DECLARE @uGroupId uniqueidentifier;
		DECLARE @uGroupName nvarchar(max);

OPEN udb_cursor;
FETCH NEXT FROM udb_cursor INTO @UserId,@Username, @uGroupId, @uGroupName
WHILE @@FETCH_STATUS = 0  
BEGIN
		declare @uTMP table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @uTMP1 table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @uTMP2 table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @uTMP3 table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @uTMP4 table (id uniqueidentifier, taskId uniqueidentifier, worker uniqueidentifier);
		declare @uTMP5 table (id uniqueidentifier, taskId uniqueidentifier);
		declare @uTMP6 table (id uniqueidentifier, project uniqueidentifier, worker uniqueidentifier);
		declare @uTMP7 table (id uniqueidentifier, taskId uniqueidentifier, worker uniqueidentifier);
		
		DECLARE @unoOfCreatedTasks int;
		DECLARE @unoOfFinishedTasks int;
		DECLARE @unoOfChangedStatusTimes int;
		DECLARE @unoOfOverDateTasks int;
		DECLARE @unoOfComments int;
		DECLARE @unoOfUpdatedTimes int;
		DECLARE @unoOfSeen int;
		DECLARE @unoOfReplies int;

		--For @unoOfCreatedTasks
		insert into @uTMP select t.Id, t.Project, t.CreatedBy  from AG_Task_Task t where CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.CreatedBy = @UserId and t.Project= @uGroupId;

		--For @unoOfFinishedTasks
		insert into @uTMP1 select Id, Project, ModifiedBy  from AG_Task_Task where CONVERT(nvarchar(10), Modified, 120) = CONVERT(nvarchar(10), @yesterday, 120) 
				and (Status='532e9f1e-f5dc-4e75-b7c9-2bd785bbda67' or Status='53cc3819-c019-4749-b0e4-52213438049b') and ModifiedBy = @UserId and Project= @uGroupId;

				
		--For @unoOfChangedStatusTimes
		insert into @uTMP2 select Id, Project, CreatedBy from (select l.Id, t.Project, l.CreatedBy, l.Data from AG_Data_Logs l left join AG_Task_Task t on l.SourceId = t.Id 
																	where CONVERT(nvarchar(10), l.Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and l.CreatedBy = @UserId and t.Project = @uGroupId and l.Code='ChangedHistory') a
						where Data.value('(/Document/Data/Dynamic/Changes)[1]', 'varchar(max)') like '%"ColumnName":"Status"%' and Data.value('(/Document/Data/Dynamic/Version)[1]', 'varchar(max)') not like '%1%';
						
						
		--For @unoOfOverDateTasks
		insert into @uTMP3 select Id, Project, Worker  from  AG_Task_Task where ((CONVERT(nvarchar(10), Deadline, 120) = CONVERT(nvarchar(10), @today, 120) and
					Status<>'532e9f1e-f5dc-4e75-b7c9-2bd785bbda67' and Status<>'53cc3819-c019-4749-b0e4-52213438049b') or (PlanManHour < ActualManHour  and
					Status='532e9f1e-f5dc-4e75-b7c9-2bd785bbda67' and Status='53cc3819-c019-4749-b0e4-52213438049b'))
					and CONVERT(nvarchar(10), Modified, 120) = CONVERT(nvarchar(10), @yesterday, 120) and Worker = @UserId and Project= @uGroupId;
		--For @unoOfComments
		--insert into @uTMP4 select Id, Parent, ParentId from xDocument_Comment where  CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) 
		--			and CreatedBy = @UserId
		--			and Parent in (select t.Id from AG_Task_Task t where CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.Project = @uGroupId);
		insert into @uTMP4 select Id, Project, CreatedBy from (select l.Id, t.Project, l.CreatedBy, l.Data from AG_Data_Logs l left join AG_Task_Task t on l.SourceId = t.Id 
																	where CONVERT(nvarchar(10), l.Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and l.CreatedBy = @UserId and t.Project = @uGroupId and l.Code='ChangedHistory') a
						where Data.value('(/Document/Data/Dynamic/Changes)[1]', 'varchar(max)') like '%"ColumnName":"Comment"%';
		
		--For @unoOfUpdatedTimes
		insert into @uTMP5 select Id, SourceId from AG_Data_Logs where  CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and Code='ChangedHistory' 
					and CreatedBy = @UserId
					and SourceId in (select t.Id from AG_Task_Task t where CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and t.Project = @uGroupId);
					
		--For @unoOfSeen
		insert into @uTMP6 select Id, Project, CreatedBy from (select l.Id, t.Project, l.CreatedBy, l.Data from AG_Data_Logs l left join AG_Task_Task t on l.SourceId = t.Id 
																	where CONVERT(nvarchar(10), l.Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and l.CreatedBy = @UserId and t.Project = @uGroupId and l.Code='ChangedHistory') a
						where Data.value('(/Document/Data/Dynamic/Changes)[1]', 'varchar(max)') like '%"ColumnName":"Seen"%';
						
		--For @unoOfReplies
		--insert into @uTMP7 select x.Id, y.taskId, x.ParentId from (select Id, Parent, ParentId from xDocument_Comment where  CONVERT(nvarchar(10), Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) ) x
		--				join (select Id, Parent as taskId from xDocument_Comment where CreatedBy = @UserId
		--			and Parent in (select t.Id from AG_Task_Task t where t.Project = @uGroupId)) y on x.Parent = y.Id
		insert into @uTMP7 select Id, Project, CreatedBy from (select l.Id, t.Project, l.CreatedBy, l.Data from AG_Data_Logs l left join AG_Task_Task t on l.SourceId = t.Id 
																	where CONVERT(nvarchar(10), l.Created, 120) = CONVERT(nvarchar(10), @yesterday, 120) and l.CreatedBy = @UserId and t.Project = @uGroupId and l.Code='ChangedHistory') a
						where Data.value('(/Document/Data/Dynamic/Changes)[1]', 'varchar(max)') like '%"ColumnName":"Reply"%';
		

		select @unoOfCreatedTasks = count(*)  from @uTMP;
		select @unoOfFinishedTasks = count(*)  from @uTMP1;
		select @unoOfChangedStatusTimes = count(*)  from @uTMP2;
		select @unoOfOverDateTasks = count(*)  from @uTMP3;
		select @unoOfComments = count(*)  from @uTMP4;
		select @unoOfUpdatedTimes = count(*)  from @uTMP5;
		select @unoOfSeen = count(*)  from @uTMP6;
		select @unoOfReplies = count(*)  from @uTMP7;

		insert xDocument_Document (TotalAttachments, TotalComments, TotalDownloads, TotalPages, TotalRatingPoints, TotalRatings, TotalReadingTimes, Priority, Category, Lead, DisplayImage, Author, DisplayDate, Code, State)
		
		select 
		@unoOfCreatedTasks, @unoOfFinishedTasks, @unoOfChangedStatusTimes,@unoOfOverDateTasks,@unoOfComments,@unoOfUpdatedTimes, @unoOfReplies, @unoOfSeen, @uGroupId, @uGroupName, @UserId, @Username, @yesterday, 'TaskSummary', 1
		DELETE FROM @uTMP;
		DELETE FROM @uTMP1;
		DELETE FROM @uTMP2;
		DELETE FROM @uTMP3;
		DELETE FROM @uTMP4;
		DELETE FROM @uTMP5;
		DELETE FROM @uTMP6;
		DELETE FROM @uTMP7;

FETCH NEXT 
FROM 
  udb_cursor INTO @UserId,@Username, @uGroupId, @uGroupName

  end;
  CLOSE udb_cursor;
DEALLOCATE udb_cursor;
