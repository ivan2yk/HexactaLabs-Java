package ar.com.hexacta.tpl.service;

import ar.com.hexacta.tpl.model.User;

public interface ILoginService {
	public User findUserByUsernameAndPassword(String username, String password);
}
