<?php
/* Admin Side*/
function hm_location(){
	$res = get_results("select * from location");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_location(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('location', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Location Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('location', $data);
		return array('status' => 'Success', 'msg' => 'Location Added Successfully');
	}
}

function hm_delete_location(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('location', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Location Deleted Successfully');
}

function hm_change_location_status(){
	update('location', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Location Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Location Unpublished Successfully');
	}
}