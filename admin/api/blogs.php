<?php

/* Admin Side*/

function hm_blogs(){

	$res = get_results("select * from blogs");

	return array('status' => 'Success', 'data' => $res);

}



function hm_save_blogs(){

	$data = $_POST;

	

	



	if(isset($data['id'])){

		$id = $data['id'];

		unset($data['id']);

		update('blogs', $data, array('id' => $id));

		return array('status' => 'Success', 'msg' => 'Blog Updated Successfully');

	} else {

		$data['created_on'] = date('Y-m-d H:i:s');

		$data['status']= 1;

		insert('blogs', $data);

		return array('status' => 'Success', 'msg' => 'Blog Added Successfully');

	}

}



function hm_delete_blogs(){

	$data = $_POST['delete'];



	foreach ($data as $key => $value) {

		delete('blogs', array('id' => $value));

	}



	return array('status' => 'Success', 'msg' => 'Blog Deleted Successfully');

}



function hm_change_blogs_status(){

	update('blogs', array('status' => $_POST['status']), array('id' => $_POST['id']));



	if($_POST['status']){

		return array('status' => 'Success', 'msg' => 'Blogs Published Successfully');

	} else {

		return array('status' => 'Success', 'msg' => 'Blogs Unpublished Successfully');

	}

}