<?php
/* Admin Side*/
function hm_benefits(){
	$res = get_results("select * from benefits");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_benefits(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('benefits', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Benefit Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('benefits', $data);
		return array('status' => 'Success', 'msg' => 'Benefit Added Successfully');
	}
}

function hm_delete_benefits(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('benefits', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Benefit Deleted Successfully');
}

function hm_change_benefits_status(){
	update('benefits', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Benefit Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Benefit Unpublished Successfully');
	}
}