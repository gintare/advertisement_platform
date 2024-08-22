package lt.techin.gintare.back.exceptions;

public class AdvertisementNotFoundException extends RuntimeException{

    public AdvertisementNotFoundException(String msg){
        super(msg);
    }
}
