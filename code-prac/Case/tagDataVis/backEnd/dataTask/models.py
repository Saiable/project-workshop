# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Files(models.Model):
    id = models.BigIntegerField(primary_key=True, db_comment='每个文件的id')
    origin_name = models.CharField(max_length=255, blank=True, null=True, db_comment='初始文件名称，始终是一个压缩包，如果不是，人工处理一下')
    src = models.CharField(max_length=255, blank=True, null=True, db_comment='直接提供的文件下载地址，需要将备份目录设置为文件服务器访问目录')
    origin = models.CharField(max_length=255, blank=True, null=True, db_comment='一开始对接时，从哪儿得到这个文件的（群、服务器等），也可能是某个原始文件')
    get_time = models.DateField(blank=True, null=True, db_comment='获取文件的时间')
    description = models.CharField(blank=True, null=True, db_comment='对该文件的来源，包含内容，做一下大致的描述')
    project_id = models.IntegerField(blank=True, null=True, db_comment='该文件隶属于哪个项目')
    type = models.CharField(max_length=255, blank=True, null=True, db_comment='0，代表是原始数据；1，代表是处理过的一些数据')
    task_name = models.CharField(max_length=255, blank=True, null=True, db_comment='该字段主要针对原始数据，有些命名不能明确表达含义，需要另起一个命名')

    class Meta:
        managed = False
        db_table = 'files'


class Project(models.Model):
    id = models.AutoField(primary_key=True, db_comment='表id')
    name = models.CharField(max_length=255, blank=True, null=True, db_comment='实际项目名称')
    timestamp = models.DateField(blank=True, null=True, db_comment='项目开始的大致时间，取开始记录时的入库时间2')
    description = models.CharField(max_length=255, blank=True, null=True, db_comment='项目的大致描述')
    project_id = models.CharField(max_length=255, blank=True, null=True, db_comment='项目实际编码')

    class Meta:
        managed = False
        db_table = 'project'
        auto_created = True


class TaskBatchList(models.Model):
    id = models.AutoField(primary_key=True, db_comment='任务id，每次新任务，新增一条记录') # 需要将反向生成的CharField修改成AutoField
    intro = models.CharField(max_length=255, blank=True, null=True, db_comment='简要介绍下此次任务的内容，相当于标题')
    tag_related_files = models.CharField(max_length=255, blank=True, null=True, db_comment='本次任务涉及的文件，从files表中获取id，如果有多个，以英文逗号隔开，如1,2')
    description = models.CharField(max_length=255, blank=True, null=True, db_comment='对此次任务的详细描述')
    start_time = models.DateField(blank=True, null=True, db_comment='任务开始时间')
    end_time = models.DateField(blank=True, null=True, db_comment='任务结束时间')
    file_type = models.CharField(max_length=255, blank=True, null=True, db_comment='此次任务设计的文件类型，如果有多个，以英文逗号隔开，如txt,doc,docx')
    file_number = models.IntegerField(blank=True, null=True, db_comment='文件的数量')
    tools = models.CharField(max_length=255, blank=True, null=True, db_comment='使用了什么工具来处理此次任务，如果有多个，以英文逗号隔开，如python,labelstudio')
    tools_path = models.CharField(max_length=255, blank=True, null=True, db_comment='如果是在标注工具或者核验平台上处理的，给出任务路径即可')
    category_nums = models.CharField(max_length=255, blank=True, null=True, db_comment='本次任务的性质：1，标注；2，数据整理，分类，核验等；3，其他；4，待定；')
    solved = models.CharField(max_length=255, blank=True, null=True, db_comment='该次任务是否完成了：1，完成，0，进行中')
    source_file_path = models.CharField(max_length=255, blank=True, null=True, db_comment='该次任务涉及的源文件路径，可以是文件夹')
    tag_result_path = models.CharField(max_length=255, blank=True, null=True, db_comment='任务结果文件的路径，可以是文件夹')
    backup_name = models.CharField(max_length=255, blank=True, null=True, db_comment='该次任务备份文件名称，一般是zip压缩包')
    project_id = models.CharField(max_length=255, blank=True, null=True, db_comment='该次任务隶属于哪个项目')
    project_batch_id = models.CharField(max_length=255, blank=True, null=True, db_comment='在每个项目下，对应的batch_id，不同于id，这个id是对应单个项目的')

    class Meta:
        managed = False
        db_table = 'task_batch_list'
        auto_created = True

