import os
from django.http import HttpResponse, FileResponse
from django.shortcuts import render
from django.conf import settings

def list_files_in_directory(directory_path):
    file_list = []
    for file in os.listdir(directory_path):
        file_path = os.path.join(directory_path, file)
        if os.path.isfile(file_path):
            file_list.append(file_path)
    return file_list

def download_file(request):
    file_path = request.GET.get('path')
    full_path = os.path.join(settings.BASE_DIR, file_path)

    if os.path.isfile(full_path):
        # 这种写法速度有点慢
        # with open(full_path, 'rb') as f:
        #     response = HttpResponse(f.read(), content_type='application/octet-stream')
        #     response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
        #     return response

        # 使用 with open 后尝试再次读取文件时，文件已经在 with 块结束时关闭了。为了解决这个问题，我们需要更改代码结构，使 FileResponse 能够直接操作文件对象。
        # with open(full_path, 'rb') as file:
        #     response = FileResponse(file, as_attachment=True)
        #     return response

        # 这种写法速度很快
        response = FileResponse(open(full_path, 'rb'), as_attachment=True)
        return response
    
    elif os.path.isdir(full_path):
        file_list = list_files_in_directory(full_path)
        return render(request, 'file_list.html', {'file_list': file_list, 'full_path': full_path})
    else:
        return HttpResponse("Invalid file or directory path.", status=400)
