$(()=> {

	$('.todo-list').on('update', function(e, data) {
		const leftItem = data.filter(item=> (!item.completed)) || []
		$('.todo-count strong').html(leftItem.length)
	})

	$('.todo-list').todoList()

	$('.new-todo').on('keypress', function(e) {
		if(e.keyCode === 13) {
			$('.todo-list').todoList('add', $(this).val().trim())
			$(this).val('')
		}
	})

	$('#toggle-all').on('change', function(e) {
		const checked = $(this).prop('checked')
		$('.todo-list').todoList('toggleAll', checked)
	})
})
