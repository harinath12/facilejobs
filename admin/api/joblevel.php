<?php
/* Admin Side*/
function hm_joblevel(){
	$res = get_results("select * from joblevel");
	return array('status' => 'Success', 'data' => $res);
}

function hm_save_joblevel(){
	$data = $_POST;
	
	

	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		update('joblevel', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Job Level Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status']= 1;
		insert('joblevel', $data);
		return array('status' => 'Success', 'msg' => 'Job Level Added Successfully');
	}
}

function hm_delete_joblevel(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('joblevel', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Job Level Deleted Successfully');
}

function hm_change_joblevel_status(){
	update('joblevel', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Job Level Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Job Level Unpublished Successfully');
	}
}