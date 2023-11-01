from reportlab.platypus.flowables import BalancedColumns
from reportlab.platypus.frames import ShowBoundaryValue

mytable = [[1,2,3,4],[5,6,7]]#按照这个格式填写
img_activity=Image('./png/1.png')
F = [ mytable, img_activity]#在该列表中填写需要分列展示的内容
story.append(
 Balanced(
 F, #the flowables we are balancing
 nCols = 2, #the number of columns
 needed = 72,#the minimum space needed by the flowable
 spacBefore = 0,
 spaceAfter = 0,
 showBoundary = None, #optional boundary showing
leftPadding=None, #these override the created frame
 rightPadding=None, #paddings if specified else the
 topPadding=None, #default frame paddings
 bottomPadding=None, #are used
 innerPadding=None, #the gap between frames if specified else
 #use max(leftPadding,rightPadding)
 name='', #for identification purposes when stuff goes awry
 endSlack=0.1, #height disparity allowance ie 10% of available height
 )
 )