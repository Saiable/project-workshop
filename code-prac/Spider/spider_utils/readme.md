在业务代码的第一行插入如下代码

```python
import sys
utils_path = r"/app/code/project-workshop/code-prac/Spider/spider_utils"
sys.path.append(utils_path)

from proxy import get_proxies
from ua import fake_ua
```
