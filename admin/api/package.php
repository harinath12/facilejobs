<?php
/* Admin Side*/
function hm_packages(){
	$res = get_results("select * from packages");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_package(){
	$data = $_POST;

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('packages', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Package Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status'] = 1;
		insert('packages', $data);
		return array('status' => 'Success', 'msg' => 'Package Added Successfully');
	}
}

function hm_delete_package(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('packages', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Package Deleted Successfully');
}

function hm_change_package_status(){
	update('packages', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Package Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Package Unpublished Successfully');
	}
}