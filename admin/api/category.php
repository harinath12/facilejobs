<?php
/* Admin Side*/
function hm_category(){
	$res = get_results("select *, (SELECT count(*) from jobs where jobs.category = category.id) as no_of_job from category");
	$new_res =  array();
	foreach ($res as $key => $value) {
		if($value['parent'] == 0){
			$value['parent_details'] = array('name' => 'Parent');
		} else {
			$value['parent_details'] = get_data_by_id('category', $value['parent']);
		}
		$new_res[] = $value;	
	}
	return array('status' => 'Success', 'data' => $new_res);
}

function hm_save_category(){
	$data = $_POST;
	
	
	if(isset($data['id'])){
		$id = $data['id'];
		unset($data['id']);
		unset($data['parent_details']);
		unset($data['no_of_job']);
		update('category', $data, array('id' => $id));
		return array('status' => 'Success', 'msg' => 'Category Updated Successfully');
	} else {
		$data['created_on'] = date('Y-m-d H:i:s');
		$data['status'] = 1;
		insert('category', $data);
		return array('status' => 'Success', 'msg' => 'Category Added Successfully');
	}
}

function hm_delete_category(){
	$data = $_POST['delete'];

	foreach ($data as $key => $value) {
		delete('category', array('id' => $value));
	}

	return array('status' => 'Success', 'msg' => 'Category Deleted Successfully');
}

function hm_change_status_cat(){
	update('category', array('status' => $_POST['status']), array('id' => $_POST['id']));

	if($_POST['status']){
		return array('status' => 'Success', 'msg' => 'Category Published Successfully');
	} else {
		return array('status' => 'Success', 'msg' => 'Category Unpublished Successfully');
	}
}