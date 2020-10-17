<?php
/* Admin Side*/
function hm_industry(){
	$res = get_results("select * from industry");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_industry(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('industry', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Industry Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('industry', $data);
		return array('status' => 'Success', 'msg' => 'Industry Added Successfully');
	}
}

function hm_delete_industry(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('industry', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Industry Deleted Successfully');
}

function hm_change_industry_status(){
	update('industry', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Industry Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Industry Unpublished Successfully');
	}
}