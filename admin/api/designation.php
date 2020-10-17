<?php
/* Admin Side*/
function hm_designation(){
	$res = get_results("select * from designation");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_designation(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('designation', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Designation Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('designation', $data);
		return array('status' => 'Success', 'msg' => 'Designation Added Successfully');
	}
}

function hm_delete_designation(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('designation', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Designation Deleted Successfully');
}

function hm_change_designation_status(){
	update('designation', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Designation Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Designation Unpublished Successfully');
	}
}