# edit the URI below to add your RDS password and your AWS URL
# The other elements are the same as used in the tutorial
# format: (user):(password)@(db_identifier).amazonaws.com:3306/(db_name)

# SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:admin123@softcon-db.cliymerdn9rz.us-east-1.rds.amazonaws.com:3306/softcon-db'
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://admin:admin123@softcondbinstance.cliymerdn9rz.us-east-1.rds.amazonaws.com:3306/softcondb'

# Uncomment the line below if you want to work with a local DB
#SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'

SQLALCHEMY_POOL_RECYCLE = 3600

WTF_CSRF_ENABLED = True
SECRET_KEY = 'dsaf0897sfdg45sfdgfdsaqzdf98sdf0a'