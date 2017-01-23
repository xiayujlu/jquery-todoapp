!function(){

  var $addTask=$('.add-task') //获取表单元素的jquery对象
  var taskList=[];// 所有task的容器
  var $taskList=$('.task-list')
  var $taskDetail=$('.task-detail')
  var $taskMask=$('.task-detail-mask')
  //初始化
  init();
  //
  $addTask.on('submit',function(e){
    let newTask={} // 待存储新task对象
    let $input=$(this).find('input')
    e.preventDefault();
    newTask.content=$input.val() //获取输入的内容
    if(!newTask){return;} //如果没有输入结束执行此函数
    //添加成功，输入框清零
    if(addTask(newTask)){
      $input.val('')
    }
  })
  $taskList.on('click','.delete',function(){
    let $this=$(this)
    let $item=$this.parent();
    let idx=$item.data('index')
    let result=confirm('确定删除？')
    result?deleteTask(idx):null;
  }).on('click','.detail',function(){
    let $this=$(this)
    let $item=$this.parent();
    let idx=$item.data('index')
    show_task_detail(idx)
  })
  function init(){
    taskList=store.get('taskList') || [];
    if(taskList.length!=0){
      renderTaskList()
    }
  }
  // 刷新localstorage并更新view
  function refreshLoaclStorage(){
    store.set('taskList',taskList)
    renderTaskList()
  }
  function addTask(newTask){
    // 将新task推入tasklist
    taskList.push(newTask);
    refreshLoaclStorage()
    return true;
  }
  function deleteTask(idx){
    // 如果没有idx或idx项不存在直接返回
    delete taskList[idx];
    refreshLoaclStorage()
  }
  function renderTaskList(){
    var $taskList=$('.task-list')
    $taskList.html('')
    for (let i=0;i<taskList.length;i++){
      let $task=renderTaskItem(taskList[i],i);
      $taskList.append($task)
    }
  }
  function renderTaskItem(data,idx){
    if(!data || !idx) return
    // 定义模板
    var taskItemTpl='<div class="task-item" data-index='+idx+'>'+
                      '<span><input type="checkbox"></span>'+
                      '<span class="task-content">'+data.content+'</span>'+
                      '<span class="action delete">删除</span>'+
                      '<span class="action detail">详细</span>'+
                    '</div>';
    return $(taskItemTpl)

  }
  function show_task_detail(idx){
    $taskDetail.show();
    $taskMask.show();
  }
}();
