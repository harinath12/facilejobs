<?php
/* Admin Side*/
function hm_education(){
	$res = get_results("select * from education");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_education(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('education', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Education Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('education', $data);
		return array('status' => 'Success', 'msg' => 'Education Added Successfully');
	}
}

function hm_delete_education(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('education', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Education Deleted Successfully');
}

function hm_change_education_status(){
	update('education', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Education Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Education Unpublished Successfully');
	}
}