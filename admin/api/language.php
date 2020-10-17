<?php
/* Admin Side*/
function hm_language(){
	$res = get_results("select * from language");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_language(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('language', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Language Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('language', $data);
		return array('status' => 'Success', 'msg' => 'Language Added Successfully');
	}
}

function hm_delete_language(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('language', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Language Deleted Successfully');
}

function hm_change_language_status(){
	update('language', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Language Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Language Unpublished Successfully');
	}
}