<?php
/* Admin Side*/
function hm_pages(){
	$res = get_results("select * from pages");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_page(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('pages', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Page Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('pages', $data);
		return array('status' => 'Success', 'msg' => 'Page Added Successfully');
	}
}

function hm_delete_page(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('pages', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Page Deleted Successfully');
}

function hm_change_page_status(){
	update('pages', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Page Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Page Unpublished Successfully');
	}
}