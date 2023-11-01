from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.core.serializers.json import DjangoJSONEncoder
from .models import Project, TaskBatchList
import json
# Create your views here.


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

# 获取项目列表


def project_list(request):
    # if request.method == 'GET':
    projects = Project.objects.all()
    project_list = []
    for project in projects:
        project_dict = {
            'id': project.id,
            'name': project.name or '',
            'timestamp': project.timestamp or '',
            'description': project.description or '',
            'project_id': project.project_id or '',
        }
        project_list.append(project_dict)

    response = {
        'code': 200,
        'data': project_list,
        'message': '查询成功'
    }
    return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})

# 根据project_id查询单条记录


def project_per_list(request):
    if (request.method == 'GET'):
        project_id = request.GET.get('project_id')
        try:
            project = Project.objects.get(project_id=project_id)
            response = {
                'id': project.id,
                'name': project.name or '',
                'timestamp': project.timestamp or '',
                'description': project.description or '',
                'project_id': project.project_id or '',
            }
            return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})
        except Project.DoesNotExist:
            response = {
                'code': 200,
                'data': {
                    'project_id': project_id,
                    'exists': False
                },
                'message': '项目不存在'
            }

            return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})

#  根据前台发送POST请求的传参，新增项目


def project_add(request):
    if request.method == 'POST':
        # request的content-type时json，需要解码
        data = json.loads(request.body.decode('utf-8'))
        # 获取用户提交的数据,key为前台定义的key
        project_id = data.get('project_id')
        name = data.get('name')
        timestamp = data.get('timestamp')
        description = data.get('description')
        # 校验格式

        # 在数据库表中，新增一条数据
        Project.objects.create(project_id=project_id, name=name,
                               timestamp=timestamp, description=description, )
        # 返回响应
        response = {
            'code': 200,
            'data': '',
            'message': '新增成功'
        }
        return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})

# 查询project_id是否存在


def project_id_check(request):
    if request.method == 'GET':
        # data = json.loads(request.body.decode('utf-8'))
        project_id = request.GET.get('project_id')  # 获取前端传递的 project_id 参数
        try:
            project = Project.objects.get(
                project_id=project_id)  # 在项目表中查询 project_id
            response = {
                'code': 200,
                'data': {
                    'project_id': project_id,
                    'exists': True
                },
                'message': '项目编码重复'
            }
        except Project.DoesNotExist:
            response = {
                'code': 200,
                'data': {
                    'project_id': project_id,
                    'exists': False
                },
                'message': '项目编码未重复'
            }

        return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})

# 删除project，不向前台提供该接口


def project_delete(request):
    id = request.GET.get('id')
    print(id)
    # 拿到project_id调用delete()方法
    Project.objects.filter(id=id).delete()
    return HttpResponse('删除成功')

# 根据id更新项目表


def project_update(request):
    if request.method == 'POST':
        # request的content-type时json，需要解码
        data = json.loads(request.body.decode('utf-8'))
        # 获取用户提交的数据,key为前台定义的key
        id = data.get('id')
        project_id = data.get('project_id')
        name = data.get('name')
        description = data.get('description')
        timestamp = data.get('timestamp')
        try:
            Project.objects.filter(id=id).update(
                project_id=project_id, name=name, description=description, timestamp=timestamp)
            response = {
                'code': 200,
                'data': 'success',
                'message': '修改成功'
            }
            return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})
        except Project.DoesNotExist:
            response = {
                'code': 0,
                'data': '',
                'message': '修改失败'
            }
            return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})


# 查询所有的batch_list
def batch_list(request):
    # if request.method == 'GET':
    batchs = TaskBatchList.objects.all().order_by('-project_id', '-project_batch_id')  # 使用负号表示降序排序
    batch_list = []
    for batch in batchs:
        batch_dict = {
            'id': batch.id,
            'project_batch_id': batch.project_batch_id or '',
            'project_id': batch.project_id or '',
            'intro': batch.intro or '',
            'project_id': batch.project_id or '',
            'description': batch.description or '',
            'start_time': batch.start_time or '',
            'end_time': batch.end_time or '',
            'tools': batch.tools or '',
            'tools_path': batch.tools_path or '',
            'tag_related_files': batch.tag_related_files or '',
            'file_type': batch.file_type or '',
            'file_number': batch.file_number or '',
            'category_nums': batch.category_nums or '',
            'solved': batch.solved or '',
            'source_file_path': batch.source_file_path or '',
            'tag_result_path': batch.tag_result_path or '',
            'backup_name': batch.backup_name or '',
        }
        batch_list.append(batch_dict)

    response = {
        'code': 200,
        'data': batch_list,
        'message': '查询成功'
    }
    return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})

#  根据前台发送POST请求的传参，新增项目


def batch_add(request):
    if request.method == 'POST':
        # request的content-type时json，需要解码
        data = json.loads(request.body.decode('utf-8'))
        # 获取用户提交的数据,key为前台定义的key
        project_batch_id = data.get('project_batch_id')
        project_id = data.get('project_id')
        intro = data.get('intro')
        description = data.get('description')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        tools = data.get('tools')
        tools_path = data.get('tools_path')
        tag_related_files = data.get('tag_related_files')
        file_type = data.get('file_type')
        file_number = data.get('file_number')
        category_nums = data.get('category_nums')
        solved = data.get('solved')
        source_file_path = data.get('source_file_path')
        tag_result_path = data.get('tag_result_path')
        backup_name = data.get('backup_name')

        # 校验格式
        print(data)
        # 在数据库表中，新增一条数据
        TaskBatchList.objects.create(project_batch_id=project_batch_id, project_id=project_id, intro=intro, description=description, start_time=start_time, end_time=end_time, tools=tools, tools_path=tools_path,
                                     tag_related_files=tag_related_files, file_type=file_type, file_number=file_number, category_nums=category_nums, solved=solved, source_file_path=source_file_path, tag_result_path=tag_result_path, backup_name=backup_name)
        # 返回响应
        response = {
            'code': 200,
            'data': '',
            'message': '新增成功'
        }
        return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})

# 根据id更新任务表


def batch_update(request):
    if request.method == 'POST':
        # request的content-type时json，需要解码
        data = json.loads(request.body.decode('utf-8'))
        # 获取用户提交的数据,key为前台定义的key
        id = data.get('id')
        project_batch_id = data.get('project_batch_id')
        intro = data.get('intro')
        description = data.get('description')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        tools = data.get('tools')
        tools_path = data.get('tools_path')
        tag_related_files = data.get('tag_related_files')
        file_type = data.get('file_type')
        file_number = data.get('file_number')
        category_nums = data.get('category_nums')
        solved = data.get('solved')
        source_file_path = data.get('source_file_path')
        tag_result_path = data.get('tag_result_path')
        backup_name = data.get('backup_name')
        try:
            TaskBatchList.objects.filter(id=id).update(
                project_batch_id=project_batch_id, intro=intro, description=description, start_time=start_time, end_time=end_time, tools=tools, tools_path=tools_path,
                tag_related_files=tag_related_files, file_type=file_type, file_number=file_number, category_nums=category_nums, solved=solved, source_file_path=source_file_path, tag_result_path=tag_result_path, backup_name=backup_name)
            response = {
                'code': 200,
                'data': 'success',
                'message': '修改成功'
            }
            return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})
        except TaskBatchList.DoesNotExist:
            response = {
                'code': 0,
                'data': '',
                'message': '修改失败'
            }
            return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})
