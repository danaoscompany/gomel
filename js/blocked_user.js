var blockedUsers = [];

$(document).ready(function() {
	getBlockedUsers();
});

function getBlockedUsers() {
	blockedUsers = [];
	$("#blocked-users").find("*").remove();
	fetch(API_URL+"/admin/get_blocked_users")
		.then(response => response.text())
		.then(async (response) => {
			blockedUsers = JSON.parse(response);
			for (let i=0; i<blockedUsers.length; i++) {
				let blockedUser = blockedUsers[i];
				let profilePicture = blockedUser['profile_picture'];
				if (profilePicture != null && profilePicture.trim() != "") {
					profilePicture = USERDATA_URL+profilePicture;
				} else {
					profilePicture = 'http://116.193.190.184/omeltv/assets/images/profile_picture_placeholder.png';
				}
				$("#blocked-users").append("<tr>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+(i+1)+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><img src='"+profilePicture+"' width='40px' height='40px' style='border-radius: 20px;'>"+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+blockedUser['user']['name']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+blockedUser['blocked_user']['email']+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td>"+moment(blockedUser['date'], 'YYYY-MM-DD HH:mm:ss').format('D MMMM YYYY HH:mm:ss')+"</td>\n" +
					"\t\t\t\t\t\t\t\t\t\t<td><button type=\"button\" class=\"mb-2 btn btn-sm btn-danger mr-1\" onclick='confirmDelete("+i+")'>Hapus</button></td>\n" +
					"\t\t\t\t\t\t\t\t\t</tr>");
			}
		});
}

function confirmDelete(index) {
	if (confirm("Apakah Anda yakin ingin menghapus pengguna diblokir berikut?")) {
		let fd = new FormData();
		fd.append("id", blockedUsers[index]['id']);
		fetch(API_URL + "/admin/delete_blocked_user", {
			method: 'POST',
			body: fd
		})
			.then(response => response.text())
			.then(async (response) => {
				window.location.reload();
			});
	}
}

function add() {
	window.location.href = "http://116.193.190.184/omeltv/admin/add";
}
