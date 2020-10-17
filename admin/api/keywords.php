<?php
/* Admin Side*/
function hm_keywords(){
	$res = get_results("select * from keywords");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_keywords(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('keywords', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Keywords Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('keywords', $data);
		return array('status' => 'Success', 'msg' => 'Keywords Added Successfully');
	}
}

function hm_delete_keywords(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('keywords', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Keywords Deleted Successfully');
}

function hm_change_keywords_status(){
	update('keywords', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Keywords Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Keywords Unpublished Successfully');
	}
}